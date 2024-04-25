# CurHelper

### - DomainApiService

Nest deps

*     success: Unknown
*     throw: DomainHttpException

```typescript
class DomainApiService {
    async methodName (...args): Promise<unknown> {
        try {
            // code ..
        } catch (e) {
            throw new DomainHttpException(e);
        }
    }
}
```

### - DomainService

No framework deps

*     success: Unknown
*     throw: DomainError

```typescript
class DomainService {
    async methodName (...args): Promise<unknown> {
        try {
            // code ..
        } catch (e) {
            throw serviceError(e);
        }
    }
}
```

### Filter

*     all exceptions convert to -> DomainHttpException

### Interceptor

*     all responses (witout sse / sockets) convert to -> DomainResponse