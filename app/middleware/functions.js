exports.errorCatch = (error) => {
    console.log(error);
    res.status(500).json({error: error})
}