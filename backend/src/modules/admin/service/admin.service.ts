import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePassword, encodePassword } from 'src/modules/utils/bcrypt';
import { Repository } from 'typeorm';
import { LoginAdminDto } from '../dto/admin.dto';
import { Admin } from '../entity/admin.entity';
import { AdminSession } from '../entity/admin_session.entity';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private readonly adminModel: Repository<Admin>,
        @InjectRepository(AdminSession)
        private readonly adminSessionModel: Repository<AdminSession>,
        private readonly jwtService: JwtService
    ) {}

    async getSessionApprove(req, res) {
        let check = await this.checkIfHasSession(req.user)
        if(check) return check
        return false
    }

    async getLoginApprove(req, res) {
        let check = await this.checkIfHasLogin(req.user)
        if(check) return check
        return false
    }

    getStringDate(date) {
        return date.toLocaleDateString('sv-SE', {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        })
    }

    async checkIfHasSession(data) {
        let sessions = await this.adminSessionModel.find({
            where: {
                user: data.id
            }
        })

        let hasActive = null;
        if(sessions) {
            let newDateInfo = new Date()
            for(let i = 0; i < sessions.length; i++) {
                let validationDate = new Date(sessions[i].valid_until)
                if(validationDate.getTime() >= newDateInfo.getTime() && sessions[i].login === "true"){
                    hasActive = sessions[i].session_token;
                    break;
                }
            }
        }

        return hasActive
    }

    async checkIfHasLogin(data) {
        let sessions = await this.adminSessionModel.find({
            where: {
                user: data.id
            }
        })

        let hasActive = null;
        if(sessions) {
            let newDateInfo = new Date()
            for(let i = 0; i < sessions.length; i++) {
                let validationDate = new Date(sessions[i].valid_until)
                if(validationDate.getTime() >= newDateInfo.getTime() && sessions[i].login === "true" && sessions[i].has_admin_login === "true"){
                    hasActive = sessions[i].session_token;
                    break;
                }
            }
        }

        return hasActive
    }

    async createSession(data) {
        let check = await this.checkIfHasSession(data)
        if(check) {    
                    
            return check
        }

        let date = new Date()
        let validDate = new Date(date.setTime(date.getTime() + ((60*60*1000) / 2)))

        let token = `${this.getStringDate(new Date())}&&${encodePassword(this.getStringDate(new Date()))}`

        let newSession = {
            session_token: token,
            user: data.id,
            valid_until: this.getStringDate(validDate)
        }

        let sess = await this.adminSessionModel.create(newSession);
        sess.save();
        return token
    }

    async login(data, admin: LoginAdminDto) {
        let session = await this.adminSessionModel.findOne({
            where: {
                user: data.id,
                login: "true"
            }
        })
        
        if (!session) throw new UnauthorizedException();

        let adminInfo = await this.adminModel.findOne({
            where: {
                email: admin.email.toLowerCase()
            }
        })
        
        if(!adminInfo) throw new UnauthorizedException();
        
        if(
            adminInfo.username === admin.username && 
            adminInfo.email === admin.email.toLowerCase() && 
            comparePassword(admin.password, adminInfo.password)) {
                session.has_admin_login = "true";
                session.save();
                return "Successfully logged in"
            }
            
        throw new UnauthorizedException();
    }

    async logout(data) {
        let check = await this.checkIfHasSession(data);
        let session = await this.adminSessionModel.findOne({
            where: {
                session_token: check
            }
        })
        session.login = "false";
        session.has_admin_login = "false";
        session.save();
    }
}
