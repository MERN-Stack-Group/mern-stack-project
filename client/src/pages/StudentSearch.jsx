function StudentSearch() {
    return (
        <div className="bg-purple-900 text-white p-6 rounded-lg">
            <h1 className="text-2xl font-bold">
                Search Students
            </h1>

            <label className="block mt-4">
                Student Name:
            </label>

            <input
                type="text"
                placeholder="Enter student name"
                className="mt-2 p-2 rounded text-black"
            />

            <button className="ml-2 bg-purple-500 px-4 py-2 rounded">
                Search
            </button>
        </div>
    );
}

export default StudentSearch;