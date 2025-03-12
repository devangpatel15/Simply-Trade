const { getAllStockService, getStockService, createStockService, updateStockService, deleteStockService } = require("../services/stock");

exports.getAllStock = async (req, res) => {
    try {
      
        const stock = await getAllStockService();
        if (!stock) {
            return res.status(404).json({ message: "No Stock found" });
          }
      
          return res.status(200).json({
            message: "Stock retrieved successfully",
            data: 
            stock,
            
          });
    } catch (err) {
        return res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
}

exports.getStock= async (req, res) => {
    try {
        const stockId = req.params.id;
        const stock = await getStockService(stockId);
        if (!stock) {
            return res.status(404).json({ message: "No Stock found" });
          }
      
          return res.status(200).json({
            message: "Stock retrieved successfully",
            data: 
            stock,
            
          });
    } catch (err) {
        return res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
}

exports.createStock = async (req, res) => {
    try {
        const newStock = req.body;
        const createdStock = await createStockService(newStock);
        
        return res.status(200).json({ message: "Stock created", data: createdStock });
    } catch (err) {
        return res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
}

exports.updateStock = async (req, res) => {
    try {
        const stockId = req.params.id;
        const stock = req.body
       const updatedStock =  await updateStockService(stockId, stock);
       if (!updatedStock) {
        return res.status(404).json({ message: "Stock not found" });
      }
  
      return res.status(200).json({ message: "Stock updated", data: updatedStock });
    }
    catch (err) {
        return res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }

    
}

exports.deleteStock = async (req, res) => {
    try {
         const stockId = req.params.id;
        const stock = await deleteStockService(stockId);
        if (!stock) {
            return res.status(404).json({ message: "Stock not found" });
          }
          return res.status(200).json({ message: "Stock deleted", data: stock });
    } catch (err) {     
        return res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }   
}
