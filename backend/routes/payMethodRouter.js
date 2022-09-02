import express from "express";
const payRouter = express.Router();
import Method from "../models/payMethodModel.js";



// Add new Bank details
payRouter.post("/",(req,res)=>{
    const uid = req.body.uid;
    const accName = req.body.accName;
    const accNumber = req.body.accNumber;
    const bankName = req.body.bankName;
    const branchName = req.body.branchName;

    const newMethod = new Method({
        uid,
        accName,
        accNumber,
        bankName,
        branchName
    });

    newMethod.save().then(()=>{
      res.json("New Payment Method Added");
    }).catch((err)=>{
        console.log(err);
    })
}

);

//Get all methods
payRouter.get("/",(req,res)=>{
    Method.find().then((methods)=>{
        res.json(methods);
    }).catch((err)=>{
        console.log(err);
    }
    )
}
);

//Get one method
payRouter.get("/:id",(req,res)=>{
    Method.findById(req.params.id).then((method)=>{
        res.json(method);
    }).catch((err)=>{
        console.log(err);
    }
    )
}
);

//Update method
payRouter.put("/:id",(req,res)=>{
    Method.findByIdAndUpdate(req.params.id,req.body).then(()=>{
        res.json("Payment Method Updated");
    }).catch((err)=>{
        console.log(err);
    }
    )
}
);

//Delete method
payRouter.delete("/:id",(req,res)=>{
    Method.findByIdAndDelete(req.params.id).then(()=>{
        res.json("Payment Method Deleted");
    }).catch((err)=>{
        console.log(err);
    }
    )
}

);

export default payRouter;