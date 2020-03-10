import { IResponseEntity } from '../../common/interface/IResponseEntity';

export const ResponseEntity = {

    create(result: any): IResponseEntity {
        return {
            result,
            timestamp: Date.now(),
        }
    },
}
