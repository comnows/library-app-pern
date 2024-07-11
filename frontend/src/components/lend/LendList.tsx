function LendList() {
  return (
    <div className="mx-6 mt-6">
      <table className="w-full rounded-t-xl overflow-hidden">
        <thead className="bg-green-500">
          <tr className="text-white text-left">
            <th className="py-3 px-5">No.</th>
            <th className="py-3 px-5">Book name</th>
            <th className="py-3 px-5">Member name</th>
            <th className="py-3 px-5">Lend date</th>
            <th className="py-3 px-5">Due date</th>
            <th className="py-3 px-5">Return date</th>
          </tr>
        </thead>
        <tbody className="border">
          <tr className="border-b hover:bg-black/5">
            <td className="py-3 px-5">1</td>
            <td className="py-3 px-5">ABC: The journey of the world</td>
            <td className="py-3 px-5">John Doe</td>
            <td className="py-3 px-5">01/01/2000</td>
            <td className="py-3 px-5">01/01/2000</td>
            <td className="py-3 px-5">01/01/2000</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-5">1</td>
            <td className="py-3 px-5">ABC: The journey of the world</td>
            <td className="py-3 px-5">John Doe</td>
            <td className="py-3 px-5">01/01/2000</td>
            <td className="py-3 px-5">01/01/2000</td>
            <td className="py-3 px-5">01/01/2000</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-5">1</td>
            <td className="py-3 px-5">ABC: The journey of the world</td>
            <td className="py-3 px-5">John Doe</td>
            <td className="py-3 px-5">01/01/2000</td>
            <td className="py-3 px-5">01/01/2000</td>
            <td className="py-3 px-5">01/01/2000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default LendList;
