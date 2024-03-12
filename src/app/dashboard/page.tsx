import { auth } from "auth";

export default async function Page(/*{session}*/) {
  const session = await auth();

  // // Retrieve data from the API using SWR for the dashboard
  // const { data } = useSWR("https://freddy.codesubmit.io/dashboard", async (url) => {
  //   const response = await fetch(url, {
  //     headers: {
  //       Authorization: `Bearer ${session.access_token}`,
  //     },

  //   });
  //   return response.json();
  // });

  // if (!data) {
  //   return <p>Loading...</p>;
  // }

  return (
    <main className="">
      <h1>Dashboard</h1>
      <div className="flex justify-between">
        <div className="border">
          <p className="label">Today</p>
          <p className="value">1522 orders</p>
        </div>

        <div className="border">
          <p className="label">Today</p>
          <p className="value">1522 orders</p>
        </div>

        <div className="border">
          <p className="label">Today</p>
          <p className="value">1522 orders</p>
        </div>
      </div>
    </main>
  );
}
