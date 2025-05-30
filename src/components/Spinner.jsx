import { ClockLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "100px auto",
};


function Spinner({loading}) {
  return (
    <div>
      <ClockLoader
        color='#2563eb'
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default Spinner
