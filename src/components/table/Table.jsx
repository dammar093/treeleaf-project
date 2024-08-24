import React, { useEffect, useState } from 'react'
import './Table.css'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../button/Button'
import { removeUser, searchedUsers, setUserByPage } from '../../features/userSlice'
import EditDetails from '../edit/EditDetails'
import Input from '../input/Input'


const Table = () => {

  const { users, total, filterUsers } = useSelector(state => state.users)
  console.log(filterUsers);
  const [page, setPage] = useState(0)
  const dispatch = useDispatch()
  const [showEdit, setShowEdit] = useState(false)
  const [id, setId] = useState(null)
  let pageSize = Math.ceil(total / 5)
  const handleSearch = (e) => {
    dispatch(searchedUsers(e.target.value))
  }
  useEffect(() => {
    dispatch(searchedUsers(""));
    dispatch(setUserByPage(page + 1));
  }, [dispatch, page, users]);

  return (
    <div className='table-component'>
      <h2>User Details</h2>
      <div className='search'>
        <Input type='search' onChange={handleSearch} placeholder="search..." />
      </div>
      <table className='table' border={1}>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Date of birth</th>
            <th>Email</th>
            <th>Phone</th>
            <th colSpan={4}>Address</th>
            <th>Action</th>
          </tr>
          <tr>
            <th colSpan={6}></th>
            <th>City</th>
            <th>District</th>
            <th>Province</th>
            <th>Country</th>

          </tr>
        </thead>
        <tbody className='table-body'>
          {
            filterUsers?.map((user, index) => {
              return (
                <tr key={user?.id}>
                  <td>{index + 1}</td>
                  <td><img className='user-profile' src={user?.profile} alt='profile' /></td>
                  <td>{user?.name}</td>
                  <td>{user?.dob}</td>
                  <td>{user?.email}</td>
                  <td>{user?.phone}</td>
                  <td>{user?.city}</td>
                  <td>{user?.district}</td>
                  <td>{user?.province}</td>
                  <td>{user?.country}</td>
                  <td style={{ display: "flex", gap: "2px", }}>
                    <Button
                      onClick={() => {
                        setShowEdit(true)
                        setId(user?.id)
                      }}
                    >Edit</Button>
                    <Button style={{ backgroundColor: "red" }}
                      // remove user from state or table
                      onClick={() => dispatch(removeUser(user?.id))}
                    >Delete</Button></td>
                </tr>
              )
            })
          }

        </tbody>
      </table>
      <div className='pagination'>
        {
          Array.from({ length: pageSize }).map((item, index) => {
            return (
              <Button
                style={{ backgroundColor: `${page === index ? "blue" : "white"}`, color: `${page === index ? "white" : "black"}`, border: "1px solid blue", }}
                onClick={() => setPage(index)}
              >
                {index + 1}
              </Button>
            )
          })
        }
      </div>

      {
        showEdit && <div className='edit'>
          <EditDetails id={id} setShowEdit={setShowEdit} />
        </div>
      }
    </div>
  )
}

export default Table