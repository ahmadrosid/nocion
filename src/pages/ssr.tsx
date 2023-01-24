import { defaultBlocks } from "@/lib/store";
import Index from "./index";

export default function SSR() {
  return <Index />;
}

export function getServerSideProps() {
  return { props: { initialState: { blockAtoms: defaultBlocks } } };
}
