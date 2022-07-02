import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react'
import useVeterinarian from '../hooks/useVeterinarian';

function Auth({ children }: {children?: ReactElement | ReactElement[]}) {
  const router = useRouter();
  const {veterinarian, handleAuth, isAuth} = useVeterinarian();

  useEffect(() => {
    if(Object.keys(veterinarian).length === 0) {
      router.push('/login');
    } else {
      handleAuth(true);
    }
  }, [veterinarian, router, handleAuth]);
  
  return (
    isAuth ? (
      <>
        {children}
      </>
    ) : null
    
  )
}

export default Auth