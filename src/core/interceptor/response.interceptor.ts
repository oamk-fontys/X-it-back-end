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

interface RelationConfig {
  [key: string]: ClassType<any>;
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
    Object.entries(relations).forEach(([key, relationType]) => {
      if (data[key]) {
        if (isArray(data[key])) {
          transformed[key] = data[key].map((item: any) =>
            transformNestedObjects(item, relationType),
          );
        } else {
          transformed[key] = transformNestedObjects(data[key], relationType);
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
