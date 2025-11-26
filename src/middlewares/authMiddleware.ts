export function authMiddleware(req: any, res: any, next: any) {
    if(req.session?.user) {
        return next();
    }
    
    return res.redirect('/user/login');
}