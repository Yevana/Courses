import React, { useEffect, useState } from 'react'
import { courseListFetch, serachCourse } from '../../redux/courses/courseSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Courselist() {

    const dispatch = useDispatch();

    const { courseLists, loading, error } = useSelector((state) => state.courses);
    const [searchTerm, setSearchTerm] = useState('');

    const onSearchCourse = (e) => {
        setSearchTerm(e.target.value);
    }

    useEffect(() => {
        dispatch(courseListFetch());
    }, []);

    return (
        <>
            <section className='container'>
                <div className='d-flex justify-content-between'>
                    <h2 className='mb-4'>Courses</h2>
                    <form>
                        <div>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Search" onChange={onSearchCourse} />
                        </div>
                    </form>
                </div>
                {loading && (
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )}

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Sr No</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Instructor</th>
                            <th scope="col">Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseLists.filter((course) =>
                            course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td><Link to={`/${item.id}`}>{item.name}</Link></td>
                                <td>{item.instructor}</td>
                                <td>{item.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {error && <p>Error: {error}</p>}

            </section>
        </>
    )
}

export default Courselist