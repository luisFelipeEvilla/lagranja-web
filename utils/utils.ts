import { useRouter }  from 'next/router';

export const verifyUserSignin = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        const router = useRouter();

        router.push("/signin");
    }    
}

