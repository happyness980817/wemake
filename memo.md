# Row-Level Security

유저들이 Supabase Key 와 URL 에 접근할 수 있더라도 데이터베이스를 안전하게 보호<br>

db 자체에서 사용자가 어떤 row 에 접근할 수 있는지를 선택 가능<br><br>

e.g.

- 로그아웃된 사용자는 행을 insert 할 수 없고, select 만 할 수 있도록 설정
- 로그인된 사용자는 profiles 테이블을 수정할 수 있지만, 본인의 프로필 row 만 수정할 수 있도록 제한

### RLS Policy

```
alter policy "Users can only update their own profiles"
on "public"."profiles"
to public
using (
-- '사용자가 이 작업을 수행할 수 있는가?' 를 판단하기 위해 조건을 설정
-- 사람들이 이 row를 (업데이트)할 수 있도록 권한을 부여하는 데 사용
  ) with check (
-- 업데이트 작업을 하는 경우에 사용자가 db 에 쓰려고 하는 데이터 자체를 확인
-- (업데이트) 하려는 데이터가 with check 부분의 제약을 만족하는지 확인
-- 데이터 무결성을 확인
);

```
