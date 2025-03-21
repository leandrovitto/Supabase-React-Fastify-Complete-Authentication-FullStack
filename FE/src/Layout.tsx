import FormattedJsonDisplay from "./FormattedJsonDisplay";
import useFetch from "./hooks/useFetch";

type Props = {
  session: any;
};

const Layout = ({ session }: Props) => {
  const { data, loading } = useFetch("http://localhost:3000/api/example");
  const { data: dataMe, loading: loadingMe } = useFetch(
    "http://localhost:3000/api/auth/me"
  );

  return (
    <div className="flex flex-col gap-4">
      {" "}
      Logged in!
      <FormattedJsonDisplay json={session} title="Session" />
      <FormattedJsonDisplay json={data} title="Api Response" />
      <FormattedJsonDisplay json={dataMe} title="Api Response /auth/me" />
      {/*  <ComponentTestHook /> */}
    </div>
  );
};

export default Layout;
