const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const { StatusCodes } = require("http-status-codes");

exports.deleteOne = (Model) => async (req, res) => {
   const { id } = req.params;
   const document = await Model.findByIdAndDelete(id);

   if (!document) {
      throw new ApiError(
         `No document for this id ${id}`,
         StatusCodes.NOT_FOUND
      );
   }

   // Trigger "remove" event when update document
   document.remove();
   res.status(StatusCodes.NO_CONTENT).send();
};

exports.updateOne = (Model) => async (req, res, next) => {
   const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
   });

   if (!document) {
      throw new ApiError(
         `No document for this id ${req.params.id}`,
         StatusCodes.NOT_FOUND
      );
   }

   // Trigger "save" event when update document
   document.save();
   res.status(StatusCodes.OK).json({ data: document });
};

exports.createOne = (Model) => async (req, res) => {
   const newDoc = await Model.create(req.body);
   res.status(StatusCodes.CREATED).json({ data: newDoc });
};

exports.getOne = (Model, populationOpt) => async (req, res) => {
   const { id } = req.params;

   // 1) Build query
   let query = Model.findById(id);
   if (populationOpt) {
      query = query.populate(populationOpt);
   }

   // 2) Execute query
   const document = await query;

   if (!document) {
      throw new ApiError(
         `No document for this id ${id}`,
         StatusCodes.NOT_FOUND
      );
   }

   res.status(StatusCodes.OK).json({ data: document });
};

exports.getAll =
   (Model, modelName = "") =>
   async (req, res) => {
      let filter = {};
      if (req.filterObj) {
         filter = req.filterObj;
      }

      // Build query
      const documentsCounts = await Model.countDocuments();
      const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
         .paginate(documentsCounts)
         .filter()
         .search(modelName)
         .limitFields()
         .sort();

      // Execute query
      const { mongooseQuery, paginationResult } = apiFeatures;
      const documents = await mongooseQuery;

      res.status(StatusCodes.OK).json({
         results: documents.length,
         paginationResult,
         data: documents,
      });
   };
