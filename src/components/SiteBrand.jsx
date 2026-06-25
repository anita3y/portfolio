import { Link } from "react-router-dom";

export default function SiteBrand({ tab }) {
  return (
    <Link className="brand" to="/" state={tab ? { tab } : undefined}>
      anita yan
    </Link>
  );
}
