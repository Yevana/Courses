import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { studentDetailsFetach, updateCourseStatus } from '../../redux/students/studentSlice';

function Dashboard() {

    const { studentDetail,loading, error } = useSelector((state) => state.student);

    const [show, setShow] = useState();
    const [status, setStatus] = useState();

    const dispatch = useDispatch();

    const onUpdateModal = (item) => {
        setShow(item);
    }

    const onChnageCourse = (e) => {
        const selectedValue = e.target.value;
        const completed = selectedValue === 'true' ? true : false;
        setStatus(completed);
    }

    const onUpdateCourse = () => {
        const data ={
            courseDetails:show,
            completed : status
        }
        dispatch(updateCourseStatus(data));
    }
    useEffect(() => {
        dispatch(studentDetailsFetach());
    }, []);

    return (
        <>
            <section className='container'>
                <h2 className='mb-4'>Student Dashboard</h2>

                {loading && (
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )}
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Sr No</th>
                            <th scope="col">Thumbnail</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Instructor</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentDetail?.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td><img src={item.thumbnail} className='rounded-circle' width={"30px"} height="auto" /></td>
                                <td>{item.name}</td>
                                <td>{item.instructor}</td>
                                <td>{item.duration}</td>
                                <td>{item.students[0].completed === true ? "Completed" : "Ongoing"}</td>
                                <td><button className='btn text-primary' onClick={() => onUpdateModal(item)} data-bs-toggle="modal" data-bs-target='#exampleModal'><i className="bi bi-pencil-square"></i></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {error && <p>Error: {error}</p>}

                {/* <!-- Modal --> */}
                <div className="modal fade" id='exampleModal' tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Course Statue Update</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body py-4">
                                <h6 className='mb-3'>Course Name: {show?.name}</h6>
                                <form>
                                    <div className='mb-3'>
                                        <label className="form-label">Course Statue</label>
                                        <select className="form-select" onChange={(e) => onChnageCourse(e)}>
                                            <option value="">select status</option>
                                            <option value="true">Completed</option>
                                            <option value="false">Ongoing</option>
                                        </select>
                                    </div>
                                <div className='text-end'>
                                <button type="button" className="btn btn-primary" onClick={onUpdateCourse}>Update</button>
                                </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard