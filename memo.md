# Row-Level Security

(Browser Client 등을 사용하는 경우에)<br>

유저들이 Supabase Key 와 URL 에 접근할 수 있더라도 데이터베이스를 안전하게 보호<br>

(Policy 를 걸어줘서 update, insert, delete 등의 특정 작업을 못하게 막는다)<br>

e.g.

- 로그인된 사용자는 profiles 테이블을 수정할 수 있지만, 본인의 프로필 row 만 수정할 수 있도록 제한

### RLS Policy

```
alter policy "Users can only update their own profiles"
on "public"."profiles"
to public
using (
-- '사용자가 이 작업을 수행할 수 있는가?' 를 판단
  ) with check (
-- 데이터 무결성 확인
-- 업데이트 등의 작업을 하는 경우에 사용자가 db 에 쓰려고 하는 데이터 자체를 확인
);

```

# Security Definer

### Security Definer View

Security Definer View 는 view 를 생성한 사용자의 권한을 사용해서 생성,

뷰를 정의한 사용자의 보안 권한을 사용하게 된다.

뷰를 호출한 사람의 권한으로 작동하게 바꾸고 싶으면 -> Security Invoker View

(관리자만 view 를 볼수 있는게 아니라 사용자들도 view 를 볼 수 있게 하려고 security invoker view 를 사용)
