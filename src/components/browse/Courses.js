import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'
import { customLayout } from '../../components/mixins'
import { ReactComponent as Add } from '../../assets/svg/add-icon.svg'
import { ReactComponent as Loading } from '../../assets/svg/circles.svg'
const Courses = props => {
  console.log('hey in Courses', props)
  const {
    courses,
    fetchMoreCourses,
    handleSaveLink,
    handleTruncateText,
    alert,
  } = props
  return (
    <Cards>
      {courses.length === 0 ? (
        <Loader>
          <Loading />
        </Loader>
      ) : (
        <InfiniteScroll
          dataLength={courses.length}
          next={fetchMoreCourses}
          hasMore={true}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {courses.map((course, index) => (
            <Card key={course.id + index}>
              <a
                href={`https://www.udemy.com${course.url}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <img src={course.image_480x270} alt='course-thumbnail' />
                <h3>{handleTruncateText(course.title)}</h3>
                <p>{handleTruncateText(course.headline, 15)}</p>
              </a>
              <SaveIcon>
                <Add
                  className='save-icon'
                  onClick={() => {
                    handleSaveLink(`https://www.udemy.com${course.url}`)
                    alert.success('Course added to Bookmarks')
                  }}
                />
              </SaveIcon>
            </Card>
          ))}
        </InfiniteScroll>
      )}
    </Cards>
  )
}

export default Courses

const Loader = styled.div`
  margin: 75px auto;
  text-align: center;
`

const Cards = styled.div`
  border-top: 1px solid #bdbdbd;
  ${customLayout('space-between')}
  flex-wrap: wrap;
  width: 100%;
  margin: 0 6px;
  margin-top: -12px;
  padding: 40px 0;
  @media (max-width: 768px) {
    margin: -12px auto 0;
  }
`

const Card = styled.div`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 6px;
  width: 22%;
  height: 350px;
  margin-bottom: 30px;
  background-color: #fff;
  cursor: pointer;
  position: relative;
  @media (max-width: 1500px) {
    width: 30%;
  }
  @media (max-width: 960px) {
    width: 45%;
  }

  @media (max-width: 570px) {
    width: 100%;
  }

  a {
    &:hover {
      h3 {
        text-decoration: underline;
      }
    }
  }

  img {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    width: 100%;
    height: 180px;
    object-fit: cover;
  }

  h3 {
    // border: 1px solid red;
    height: 50px;
    margin: 10px 0;
    padding: 0 3%;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 25px;
    word-break: break-word;
    overflow: hidden;
  }

  p {
    padding: 0 3%;
    height: 45px;
    font-size: 1.2rem;
    line-height: 20px;
    color: #6d767e;
  }
`

const SaveIcon = styled.div`
  // border: 1px solid red;
  ${customLayout('flex-end')}
  margin-top: 15px;
  padding: 0 4%;
  opacity: 0.8;
  transition: 200ms ease-out;
  &:hover {
    opacity: 1;
    transition: 200ms ease-in;
  }
`
