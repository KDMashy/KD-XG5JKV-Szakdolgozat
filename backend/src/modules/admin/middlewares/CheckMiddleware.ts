import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AdminService } from "../service/admin.service";

@Injectable()
export class CheckMiddleware implements NestMiddleware {
    constructor(private readonly adminService: AdminService){}

    async use(req: Request, res: Response, next: NextFunction) {
        if(!req.user) throw new UnauthorizedException();        
        let check = null
        if(req.path === "/admin/login") {
            check = await this.adminService.getSessionApprove(req, res)
        } else check = await this.adminService.getLoginApprove(req, res)
        if(!check) throw new UnauthorizedException()
        next();
    }
}