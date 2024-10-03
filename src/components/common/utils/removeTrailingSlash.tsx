import { Navigate, useLocation } from 'react-router-dom';

function RemoveTrailingSlash({ ...rest }) {
  const location = useLocation();

  if (location.pathname.match('/{2,}$')) {
    return (
      <Navigate replace {...rest} to={{
        pathname: location.pathname.replace(/\/+$/, '/'),
        search: location.search
      }}/>
    );
  }
  else {
    return null;
  }
}

export default RemoveTrailingSlash;