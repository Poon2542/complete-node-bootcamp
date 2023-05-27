class APIFeatures {
    constructor(query,queryString){ //query = mongoose query, queryString = query string that we get from express module (website) (normally it is req)
        this.query = query;
        this.queryString = queryString;
    }

    filter(){
        const queryObj = {...this.queryString}; //create structure from req.query object
        const excludedFields = ['page','sort','limit','fields'] //delete all page sort limit fields
        excludedFields.forEach(el=> delete queryObj[el]) //delete all field in queryobject
    
        //1) advance filtering - gte,gt,lte,lt - WTF ?????
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match =>`$${match}`) //regular expression - we need to clean it out
        //console.log(JSON.parse(queryStr));
        this.query.find(JSON.parse(queryStr));
        //let query = Tour.find(JSON.parse(queryStr));
        return this;
    }
    sort(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
            //sort by second criteria
            //sort('price rating average')
        }else{
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }
    limitFields() {
        if(this.query.fields){
            const fields = this.query.fields.split(',').join(' ');
            this.query = this.query.select(fields)
            //query = query.select('name duration price') //select only these field name
        }else{
            this.query = this.query.select('-__v'); //excluding __v field from select
        }
        return this;
    }
    paginate(){
        const page = this.query.page * 1 || 1; //turn string into int, || = default 1
        const limit = this.query.limit * 1 || 100; //100 page limit
        const skip = (page-1)*limit;
        this.query = this.query.skip(skip).limit(limit); //limit = amount of result that we have in query
        //skip = get result skip 2 then select

        return this;
    }
}
module.exports = APIFeatures