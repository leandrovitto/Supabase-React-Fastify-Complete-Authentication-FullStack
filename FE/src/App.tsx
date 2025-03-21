import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import Layout from "./Layout";

const supabase = createClient(
  process.env.VITE_PUBLIC_SUPABASE_URL as string,
  process.env.VITE_PUBLIC_SUPABASE_ANON_KEY as string
);

async function signOut() {
  const { error } = await supabase.auth.signOut();
}

const App = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return (
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
          onClick={signOut}
        >
          Sign Out
        </button>
        <Layout session={session} />
      </div>
    );
  }
};

export default App;
