import app from "./app/index";
import "./config/setup"

const PORT = parseInt(process.env.PORT);

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
})