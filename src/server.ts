import app from "./app";
import "./config/setup"

const PORT = parseInt(process.env.PORT);

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
})