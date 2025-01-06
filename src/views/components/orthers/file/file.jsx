// @ts-ignore
import React from "react";

const File=(url)=>{
    const decodeUrl = decodeURIComponent(url);  // Decode URL to get readable filename

    // Extract filename and extension
    const getFileInfo = () => {
        const filePath = decodeUrl.split("/").pop();
        const fileName = filePath?.split("?")[0]; // Remove any query parameters
        const fileExtension = fileName?.split('.').pop()?.toLowerCase();

        return {
            name: fileName || "Unknown",
            extension: fileExtension || "unknown"
        };
    };

    const { name, extension } = getFileInfo();

    // Choose icon based on file extension
    const getFileIcon = () => {
        switch (extension) {
            case "pdf":
                return require('../../../../../public/icons/pdf.png');
            case "doc":
            case "docx":
            case "gdoc":
                return require('../../../../../public/icons/word.png');
            default:
                return require('../../../../../public/icons/default.png');
        }
    };
    //
    return(
        <Div>

        </Div>
    )
}
//
export default React.memo(File)