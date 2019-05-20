import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'
import { customLayout } from '../mixins'
import { ReactComponent as Add } from '../../assets/svg/add-icon.svg'
import { ReactComponent as Loading } from '../../assets/svg/circles.svg'
const Articles = props => {
  const {
    searchTerm,
    articles,
    fetchMoreArticles,
    searchArticles,
    setArticleOffset,
    handleTruncateText,
    handleSaveLink,
    alert,
  } = props

  useEffect(() => {
    const offset = 0
    setArticleOffset(offset)
    searchArticles(searchTerm, offset)
  }, [searchTerm])

  return (
    <Cards>
      {articles.length === 0 ? (
        <Loader>
          <Loading />
        </Loader>
      ) : (
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreArticles}
          hasMore={true}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {/* //TODO: Fix Unsplash hack */}
          {articles.map((article, index) => (
            <Card key={index}>
              <a href={article.url} target='_blank' rel='noopener noreferrer'>
                <img
                  src={
                    article.thumbnail ||
                    'https://source.unsplash.com/random/345x180'
                  }
                  alt='article-thumbnail'
                />
                <h3>{handleTruncateText(article.title, 80)}</h3>
                <p>{handleTruncateText(article.description, 160)}</p>
              </a>
              <SaveIcon>
                <Add
                  className='save-icon'
                  onClick={() => {
                    handleSaveLink(article.url)
                    alert.success('Article added to Bookmarks')
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

export default Articles

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
