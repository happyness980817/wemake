import {
  createBrowserClient,
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
import type { MergeDeep, SetNonNullable, SetFieldType } from "type-fest";
import type { Database as SupabaseDatabase } from "../database.types";

export type Database = MergeDeep<
  SupabaseDatabase,
  {
    public: {
      Views: {
        messages_view: {
          Row: SetNonNullable<
            SupabaseDatabase["public"]["Views"]["messages_view"]["Row"]
          >;
        };
        community_post_list_view: {
          Row: SetFieldType<
            SetNonNullable<
              SupabaseDatabase["public"]["Views"]["community_post_list_view"]["Row"]
            >,
            "author_avatar",
            string | null
          >;
        };
        product_overview_view: {
          Row: SetNonNullable<
            SupabaseDatabase["public"]["Views"]["product_overview_view"]["Row"]
          >;
        };
        community_post_detail: {
          Row: SetNonNullable<
            SupabaseDatabase["public"]["Views"]["community_post_detail"]["Row"]
          >;
        };
        ideas_view: {
          Row: SetNonNullable<
            SupabaseDatabase["public"]["Views"]["ideas_view"]["Row"]
          >;
        };
      };
    };
  }
>;

export const browserClient = createBrowserClient<Database>(
  "https://qhmemflqvcdwtchsxyqs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFobWVtZmxxdmNkd3RjaHN4eXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODgzNTEsImV4cCI6MjA4MTk2NDM1MX0.W7dUCBS6Wltv-WMXDpGPUHhQV-I7EkI0zGzrwVIDhe8",
);

export const makeSSRClient = (request: Request) => {
  const headers = new Headers();
  const serverSideClient = createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookies = parseCookieHeader(
            request.headers.get("Cookie") ?? "",
          );
          return cookies.map(({ name, value }) => ({
            name,
            value: value ?? "",
          }));
        },
        setAll(cookies) {
          // 쿠키를 헤더에 담아서 유저에게 전달
          cookies.forEach(({ name, value, options }) => {
            headers.append(
              "Set-Cookie", // Set-Cookie 헤더를 주면 유저의 브라우저에 자동으로 쿠키를 만들어 준다
              serializeCookieHeader(name, value, options), // supabase 가 보낸 쿠키를 브라우저에서 사용할 수 있는 쿠키로 변환
            );
          });
        },
      },
    }, // 두 가지 method - 요청으로부터 특정 supabase 쿠키를 가져오는 기능 + supabase 가 유저의 쿠키를 설정하게 하는 기능
  );
  return { client: serverSideClient, headers }; // 헤더도 유저에게 보내줘야 (유저의) 브라우저에서 쿠키를 설정 가능
};
