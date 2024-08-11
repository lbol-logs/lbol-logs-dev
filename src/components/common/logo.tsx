import { baseUrl, iconSize } from 'configs/globals';

function Logo({ className }: { className: string }) {
  return (
    <img className={className} src={`${baseUrl}/logo.svg`} width={iconSize / 2} height={iconSize / 2} alt="" />
  );
}

export default Logo;