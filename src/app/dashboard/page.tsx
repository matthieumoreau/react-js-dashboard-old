import Image from "next/image";
import { auth } from "auth"

export default async function Page() {
  const session = await auth()

  console.log(session)

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
