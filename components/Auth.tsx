import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react'
import useVeterinarian from '../hooks/useVeterinarian';

function Auth({ children }: {children?: ReactElement | ReactElement[]}) {
  const router = useRouter();
  const {veterinarian, handleAuth, isAuth, loading} = useVeterinarian();

  useEffect(() => {
    if(Object.keys(veterinarian).length === 0 && !loading) {
      router.push('/login');      
    } else {
      if(!loading) {
        handleAuth(true);
      }
    }
  }, [veterinarian, router, handleAuth, loading]);
  
  return (
    isAuth ? (
      <>
        {children}
      </>
    ) : null
    
  )
}

export default Auth