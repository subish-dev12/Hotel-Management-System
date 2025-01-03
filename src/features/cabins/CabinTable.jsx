import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const [searchParams] = useSearchParams();
  const { isLoading, cabins } = useCabins();
  if (isLoading) return <Spinner />;
  const filteredValue = searchParams.get("discount") || "all";

  let filteredCabin;

  if (filteredValue === "all") filteredCabin = cabins;
  if (filteredValue === "no-discount")
    filteredCabin = cabins.filter((cabin) => cabin.discount === 0);
  if (filteredValue === "with-discount")
    filteredCabin = cabins.filter((cabin) => cabin.discount > 0);

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={filteredCabin}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
}

export default CabinTable;

//querykey:- uniquely identify the data we are going to
//query,
//the 'cabin' we see above is what we see int he
//react dev tools too.
//that is what identifies each data.
//so if we later use query with the same key('cabin')
//in another component, data will be read from cache

//queryFn:it is used for actually fetching data from api
//it returns a promise
