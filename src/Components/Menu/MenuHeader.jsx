export default function MenuHeader({subHeader,mainHeader}) {
    return (
      <>
        <h3 className="uppercase text-gray-500 font-semibold leading-4">
          {subHeader}
        </h3>
        <h2 className="text-emerald-500 font-bold text-4xl italic">
          {mainHeader}
        </h2>
      </>
    );
  }