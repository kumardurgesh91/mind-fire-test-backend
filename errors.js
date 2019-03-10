class ErrorMessages {
    
    constructor() {
        this.NAME_EMPTY = {
            error: 'Name empty',
            code: 1
        }
        this.USER_NAME_EMPTY = {
            error: 'User Name empty',
            code: 2
        }

        this.USER_NAME_INVALID = {
            error: 'User Name invalid, user name should be between 3 to 32 character',
            code: 3
        }

        this.EMAIL_EMPTY = {
            error: 'Email empty',
            code: 4
        }
        this.PASSWORD_EMPTY = {
            error: 'Password empty',
            code: 5
        }

        this.EMAIL_INVALID = {
            error: 'Email invalid, must be valid email formate',
            code: 6
        }

        this.PASSWORD_INVALID = {
            error: 'Password invalid, password should be between 3 to 32 character',
            code: 7
        }
        this.USER_NAME_DUPLICATE = {
            error: 'User Name already exist',
            code: 8
        }
        this.EMAIL_DUPLICATE = {
            error: 'Email already exist',
            code: 9
        }
        this.INVALID_USER_NAME_OR_PASSWORD = {
            error: 'Invalid user name or password',
            code: 10
        }
        this.TOKEN_MISSING = {
            error: 'token missing',
            code: 11
        }
        this.TOKEN_INVALID = {
            error: 'token invalid',
            code: 12
        }
        this.PRODUCT_NAME_MISSING = {
            error: 'Product name missing',
            code: 13
        }
        
        this.PRODUCT_PRICE_MISSING = {
            error: 'Product price missing',
            code: 14
        }
        
        this.PRODUCT_RATING_MISSING = {
            error: 'Product rating rating',
            code: 12
        }
        
        this.PRODUCT_PRICE_NUMBER = {
            error: 'Product price should be number',
            code: 12
        }
        
        this.PRODUCT_RATING_NUMBER = {
            error: 'Product rating should be number',
            code: 12
        }
        
        this.PRODUCT_ID_INVALID = {
            error: 'Product id invalid',
            code: 13
        }
    }

}


module.exports = new ErrorMessages();
