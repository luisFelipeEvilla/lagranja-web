import { appRoutes } from "../utils/constants";

const RouteGuard = ({ router, children }) => {
    const isBrowser = typeof window !== "undefined";

    if (isBrowser) {
        const jwt = localStorage.getItem('token');
        const unprotectedRoutes = [
            appRoutes.LOGIN_PAGE
        ]
        
        /**
            * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
        */
        const pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;
        
        if (isBrowser && (!jwt || jwt.length === 0) && pathIsProtected) {
            router.push(appRoutes.LOGIN_PAGE)
        }
    }


    return children;
}

export default RouteGuard;
