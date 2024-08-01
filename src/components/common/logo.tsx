import { baseUrl } from "configs/globals";

function Logo({ className }: { className: string }) {
  return (
    <img className={className} src={`${baseUrl}/logo.svg`} width="20" height="20" alt="" />
  );
}

export default Logo;