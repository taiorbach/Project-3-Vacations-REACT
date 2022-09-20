class Config {
}

class DevelopmentConfig extends Config {
    public vacationsUrl = "http://localhost:3001/api/vacations/";
    public vacationsImageUrl = "http://localhost:3001/api/vacations/images/";
    public registerUrl = "http://localhost:3001/api/auth/register/";
    public loginUrl = "http://localhost:3001/api/auth/login";
    public followersUrl = "http://localhost:3001/api/followers/"
}

class ProductionConfig extends Config {
    public vacationsUrl = "http://localhost:3001/api/vacations/";
    public vacationsImageUrl = "http://localhost:3001/api/vacations/images/";
    public registerUrl = "http://localhost:3001/api/auth/register/";
    public loginUrl = "http://localhost:3001/api/auth/login";
    public followersUrl = "http://localhost:3001/api/followers/"
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;
