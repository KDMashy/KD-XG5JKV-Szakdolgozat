import { JwtModuleAsyncOptions } from "@nestjs/jwt";
import jwtSecret from "../constants/constants";

export const jwtConfig: JwtModuleAsyncOptions= {
    useFactory: () => {
        return {
            secret: jwtSecret().secret,
            signOptions: {expiresIn: '300000s'},
        }
    }
}