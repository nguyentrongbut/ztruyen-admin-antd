const Home = () => {
    return (
        <div >
            <p>long content</p>
            {
                // indicates very long content
                Array.from({ length: 100 }, (_, index) => (
                    <div key={index}>
                        {index % 20 === 0 && index ? 'more' : '...'}
                        <br />
                    </div>
                ))
            }
        </div>
    )
}

export default Home;