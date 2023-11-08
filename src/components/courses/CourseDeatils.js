import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCourseFetch } from '../../redux/courses/courseSlice';
import { Link, useParams } from 'react-router-dom';

function CourseDetails() {

    const { id } = useParams();
    const dispatch = useDispatch();

    const { detailCourse, loading, error } = useSelector((state) => state.courses);

    useEffect(() => {
        dispatch(getCourseFetch(id));
    }, []);

    return (
        <>
            <section className='container my-4'>
                <div className='mb-3'>
                    <Link to="/" style={{ textDecoration: "none" }}><i class="bi bi-arrow-left"></i>back</Link>
                   
                </div>
                {loading && (
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )}

                <div className='border p-4'>
                    <div className='row mb-md-3'>
                        <div className='col-md-10'>
                            <div className='mb-md-3'>
                                <h6 className='mb-0'>Course name</h6>
                                <p className='mb-md-0'>{detailCourse?.name}</p>
                            </div>
                            <div className='d-flex justify-content-between mb-md-3'>
                                <div>
                                    <h6 className='mb-0'>Schedule</h6>
                                    <p className='mb-md-0'>{detailCourse?.schedule}</p>
                                </div>

                                <div>
                                    <h6 className='mb-0'>Instructor name</h6>
                                    <p className='mb-md-0'>{detailCourse?.instructor}</p>
                                </div>
                            </div>

                            <div className='d-flex justify-content-between'>

                                <div>
                                    <h6 className='mb-0'>Location</h6>
                                    <p className='mb-md-0'>{detailCourse?.location}</p>
                                </div>
                                <div>
                                    <h6 className='mb-0'>Enrollment Status</h6>
                                    <p className='mb-md-0'>{detailCourse?.enrollmentStatus}</p>
                                </div>
                                <div>
                                    <h6 className='mb-0'>Course Duration</h6>
                                    <p className='mb-md-0'>{detailCourse?.duration}</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-2'>
                            <img src={detailCourse?.thumbnail} className='img-fluid' />
                        </div>
                    </div>

                    <div className='mb-md-3'>
                        <h6 className='mb-0'>Description</h6>
                        <p className='mb-md-0'>{detailCourse?.description}</p>
                    </div>
                    <div className='mb-md-3'>
                        <h6 className='mb-0'>Pre-requisites</h6>
                        <ul>
                            {detailCourse?.prerequisites.map((prerequisite, index) => (
                                <li key={index}>{prerequisite}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h6 className='mb-1'>Syllabus as an expandable item</h6>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Week</th>
                                    <th scope="col">Content</th>
                                    <th scope="col">Topic</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detailCourse?.syllabus.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.week}</td>
                                        <td>{item.content}</td>
                                        <td>{item.topic}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>

                {error && <p>Error: {error}</p>}
            </section>
        </>
    )
}

export default CourseDetails