import { PuffLoader } from "react-spinners";
interface Loader {
  color?: string;
}
export default function Loader({ color }: Loader) {
  return (
    <PuffLoader
      color={color ?? "white"}
      loading={true}
      // cssOverride={override}
      size={15}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
