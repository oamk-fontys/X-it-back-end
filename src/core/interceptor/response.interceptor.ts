import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { isArray, isObject } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ClassType<T> {
  new (): T;
}

interface NestedRelationConfig {
  type: ClassType<any>;
  [key: string]: ClassType<any> | NestedRelationConfig;
}

type RelationConfig = {
  [key: string]: ClassType<any> | NestedRelationConfig;
};

function isClassType<T>(value: any): value is ClassType<T> {
  return typeof value === 'function';
}

function isNestedConfig(value: any): value is NestedRelationConfig {
  return isObject(value) && 'type' in value;
}

function transformNestedObjects<T>(
  data: any,
  classType: ClassType<T>,
  relations: RelationConfig = {},
): T {
  // First transform the main object
  let transformed = plainToInstance(classType, data);

  // Handle nested relations
  if (isObject(data)) {
    Object.entries(relations).forEach(([key, relationConfig]) => {
      if (data[key]) {
        if (isClassType(relationConfig)) {
          // Handle direct class type relations
          if (isArray(data[key])) {
            transformed[key] = data[key].map((item: any) =>
              transformNestedObjects(item, relationConfig),
            );
          } else {
            transformed[key] = transformNestedObjects(
              data[key],
              relationConfig,
            );
          }
        } else if (isNestedConfig(relationConfig)) {
          // Handle nested relation config
          const nestedClassType = relationConfig.type;
          const nestedRelations: RelationConfig = { ...relationConfig };
          delete nestedRelations.type;

          if (isArray(data[key])) {
            transformed[key] = data[key].map((item: any) =>
              transformNestedObjects(item, nestedClassType, nestedRelations),
            );
          } else {
            transformed[key] = transformNestedObjects(
              data[key],
              nestedClassType,
              nestedRelations,
            );
          }
        }
      }
    });
  }

  return transformed;
}

function handleArray<T>(
  classType: ClassType<T>,
  items: any[],
  relations: RelationConfig = {},
) {
  return items.map((item) =>
    transformNestedObjects(item, classType, relations),
  );
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<Partial<T>, T> {
  private relations: RelationConfig;

  constructor(
    private readonly classType: ClassType<T>,
    relations: RelationConfig = {},
  ) {
    this.relations = relations;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (isArray(data)) {
          return handleArray(this.classType, data, this.relations);
        }
        return transformNestedObjects(data, this.classType, this.relations);
      }),
    );
  }
}
