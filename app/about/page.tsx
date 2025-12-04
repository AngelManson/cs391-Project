import Header from "@/components/Header"

export default function aboutPage(){
    return (

        <div className={`flex flex-col justify-center items-center p-2`}>
            <Header/>
            <h1>About This Application</h1>
            <p>
                This application is a custom search engine built for <strong>CS391</strong>.
                Instead of digging through slides, PDFs, and lecture notes manually, this tool centralizes
                all course materials into a searchable interface powered by <strong>MongoDB</strong>.
            </p>
            <p>
                To use the app, go to the Home page and enter a keyword related to the material you’re looking for.
                You will be redirected to a results page where all matching resources are displayed. Once you select
                a source, its dedicated page will open, showing all the information and content associated with it.
            </p>
        </div>
    )
}