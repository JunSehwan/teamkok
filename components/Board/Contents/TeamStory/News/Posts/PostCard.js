import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import holderPicture from 'public/image/holderimage.png';
import DeleteModal from 'components/Common/Modal/DeleteModal';
import {
  deletePost, modifyPost, likePost, unlikePost, createComment, getComments,
} from 'firebaseConfig';
import {
  removePost, updatePost, updateDoneFalse, likeToPost, unlikeToPost,
  addComment, addCommentDoneFalse, loadComments, setRemoveDoneFalse
} from 'slices/section';
import Comments from './Comments';
import NoticeList from 'components/Common/NoticeList';
import profilePic from 'public/image/icon/happiness.png';
import Slider from './Slider';

const PostCard = ({ post }) => {
  const { user } = useSelector(state => state.user);
  const { deleteDone, updateDone, addCommentDone, mainComments } = useSelector(state => state.section);
  const dispatch = useDispatch();
  const [moreOpen, setMoreOpen] = useState(false);
  const onOpenMore = useCallback(() => {
    setMoreOpen(true);
  }, [])
  const onCloseMore = useCallback(() => {
    setMoreOpen(false);
  }, [])
  const [removeConfirm, setRemoveConfirm] = useState(false);
  const onClickRemove = useCallback(() => {
    document.body.style.overflow = "hidden";
    setRemoveConfirm(true);
    setMoreOpen(false);
  }, [])
  const onOkRemove = useCallback(async () => {
    const result = await deletePost(post?.id);
    dispatch(removePost(result));
    document.body.style.overflow = "unset";
    setRemoveConfirm(false);
  }, [post?.id, dispatch])

  const onCancelRemove = useCallback(() => {
    document.body.style.overflow = "unset";
    setRemoveConfirm(false);
  }, [])


  useEffect(() => {
    if (deleteDone) {
      dispatch(setRemoveDoneFalse())
    }
  }, [deleteDone, dispatch])

  const [modifyConfirm, setModifyConfirm] = useState(false);
  const onClickModify = useCallback(() => {
    setModifyConfirm(true);
    document.getElementById(post?.id).focus();
    setMoreOpen(false);
  }, [post?.id])
  const onClickModifyCancel = useCallback(() => {
    setModifyConfirm(false);
    setDescription(post?.description);
  }, [post?.description])
  //1줄 간략소개
  const [description, setDescription] = useState(post?.description);
  const [descriptionError, setDescriptionError] = useState(false);
  const onChangeDescription = useCallback((e) => {
    setDescription(e.currentTarget.value);
    setDescriptionError(false);
  }, [])

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (description?.length === 0) {
      return setDescriptionError(true);
    }
    const postResult = {
      modifiedId: user?.userID,
      modifiedName: user?.username,
      description: description,
    };
    const result = await modifyPost(postResult, post?.id);
    dispatch(updatePost({
      id: post?.id,
      description: description,
      modifiedId: user?.userID,
      modifiedName: user?.username,
    }));
  }, [user?.userID, user?.username, description, post?.id, dispatch])

  useEffect(() => {
    if (updateDone) {
      setModifyConfirm(false);
      dispatch(updateDoneFalse());
    }
  }, [dispatch, updateDone])


  const onLike = useCallback(async () => {
    if (!user?.userID) {
      return alert('로그인이 필요합니다.');
    }
    const likeResult = await likePost(user?.userID, user?.username, post?.id)
    dispatch(likeToPost({
      postId: post?.id,
      userId: user?.userID,
      username: user?.username,
      userAvatar: user?.avatar,
      numLikes: likeResult?.numLikes
    }));
  }, [user?.userID, user?.username, user?.avatar, dispatch, post?.id]);

  const onUnlike = useCallback(async () => {
    if (!user?.userID) {
      return alert('로그인이 필요합니다.');
    }
    await unlikePost(user?.userID, user?.username, post?.id)
    dispatch(unlikeToPost({
      userId: user?.userID,
      postId: post?.id
    }))
  }, [user?.userID, user?.username, dispatch, post?.id]);

  const liked = post?.likes?.find((v) => v?.userId === user?.userID);


  // Comment 댓글
  const [loadDone, setLoadDone] = useState(false);
  const [commentOpened, setCommentOpened] = useState(false);
  const onToggleComment = useCallback(async () => {
    setCommentOpened((prev) => !prev);
    if (loadDone === false) {
      const result = await getComments(post?.id);
      dispatch(loadComments(result));
      setLoadDone(true);
    }
  }, [dispatch, loadDone, post?.id]);


  const [comment, setComment] = useState("");
  const onChangeComment = useCallback((e) => {
    setComment(e.currentTarget.value);
  }, [])

  const onSubmitComment = useCallback(async (e) => {
    e.preventDefault();
    if (comment?.length === 0) {
      return alert("글을 입력해주세요.");
    }
    const createResult = await createComment(
      post?.id, user?.userID, user?.username, comment, user?.avatar
    );
    dispatch(addComment(createResult));
    const result = await getComments(post?.id);
    dispatch(loadComments(result));
  }, [user?.userID, comment, user?.avatar, user?.username, post?.id, dispatch])

  useEffect(() => {
    if (addCommentDone) {
      setComment("");
      dispatch(addCommentDoneFalse());

    }
  }, [dispatch, addCommentDone])

  const [commentArr, setCommentArr] = useState([]);
  useEffect(() => {
    setCommentArr(mainComments?.filter(comment =>
      comment?.postId === post?.id));
  }, [mainComments, post?.id])

  const categoryArr = [];

  NoticeList?.map((v) => (
    post?.category === v?.key ? categoryArr?.push(v?.name) : null
  ))

  // 사진이미지 클릭시 케러셀
  const [sliderOn, setSliderOn] = useState(false);
  const onClickSlider = useCallback(() => {
    setSliderOn(true);
  }, [])
  const sliderClose = useCallback(() => {
    setSliderOn(false);
  }, [])

  // 링크내용 URL로 바꾸기
  const parseLinkTextToHTML = (text) => {
    const regURL = new RegExp("(http|https|ftp|www|telnet|news|irc)://([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)", "gi");
    const regEmail = new RegExp("([xA1-xFEa-z0-9_-]+@[xA1-xFEa-z0-9-]+.[a-z0-9-]+)", "gi");

    return text
      ?.replace(regURL, "<a href='$1://$2' target='_blank'>$1://$2</a>")
      ?.replace(regEmail, "<a href='mailto:$1'>$1</a>");
  };


  return (
    <article className="w-full max-w-2xl mx-auto break-inside p-4 rounded-xl bg-white flex flex-col bg-clip-border shadow-md mb-4">
      <div className="flex pb-6 items-center justify-between">
        <div className="flex">
          <a className="inline-block mr-3" href="#">
            {/* <Image width={30} height={30} alt="pic" className="rounded-full max-w-none w-12 h-12" src={post?.photo[0]} /> */}
            {post?.creatorAvatar ? (
              <Image
                unoptimized
                alt="avatar_user"
                className="avatar rounded-lg object-cover"
                width={48} height={48}
                src={post?.creatorAvatar} />
            ) : (
              <Image
                unoptimized
                alt="avatar_user"
                className="avatar rounded-lg object-cover shadow-inner bg-slate-100"
                src={profilePic}
                width={48} height={48}
              />
            )}
          </a>
          <div className="flex flex-col">
            <div>
              <a className="inline-block text-lg text-violet-700 font-bold">
                {post?.creatorName}
              </a>
              <span className="text-gray-400 text-sm ml-1">
                {post?.isAdmin === true && "보드메이커"}
                {post?.isExpert === true && "현업담당자"}
              </span>

            </div>
            <div className="text-slate-500">
              {post?.createdAt}
            </div>
          </div>

        </div>
        {/* More 버튼 */}
        {user?.userID == post?.creatorId &&
          <div className="flex">
            {!moreOpen ?
              <button
                className="p-3 rounded-full hover:bg-gray-100 text-gray-600"
                onClick={onOpenMore}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
              :
              <div className="relative flex w-[100%] justify-end">
                <div className="relative shadow-inner bg-white rounded-full w-fit p-3 flex flex-row">
                  <button className="p-2 ml-1 hover:bg-blue-100 text-blue-600 rounded-full " onClick={onClickModify}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button className="p-2 ml-1 hover:bg-orange-100 text-orange-600 rounded-full " onClick={onClickRemove}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <button className="p-2 ml-1 hover:bg-gray-100 text-gray-600 rounded-full " onClick={onCloseMore}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            }
          </div>
        }
      </div>
      {removeConfirm ?
        <DeleteModal
          openModal={removeConfirm}
          onOk={onOkRemove}
          onCancel={onCancelRemove}
        />
        : null}

      <div className="py-1">
        {post?.photo?.length === 1 &&
          <>
            <div className="flex justify-between  hover:opacity-90">
              <button className="flex" onClick={onClickSlider}>
                <Image unoptimized width={720} height={720} alt="pic" className="rounded-md object-cover max-w-full" src={post?.photo[0] || holderPicture} />
              </button>
            </div>
          </>
        }
        {post?.photo?.length === 2 &&
          <>
            <button
              className="flex justify-between gap-[4px]  hover:opacity-90"
              onClick={onClickSlider}
            >
              <a className="flex" >
                <Image unoptimized width={520} height={520} alt="pic" className="rounded-md object-cover max-w-full " src={post?.photo[0] || holderPicture} />
              </a>
              <a className="flex" >
                <Image unoptimized width={520} height={520} alt="pic" className="rounded-md object-cover max-w-full " src={post?.photo[1] || holderPicture} />
              </a>
            </button>
          </>
        }
        {post?.photo?.length === 3 &&
          <button
            className="flex flex-row  hover:opacity-90"
            onClick={onClickSlider}
          >
            <div className="flex flex-col justify-between gap-[4px]">
              <a className="flex" >
                <Image unoptimized width={520} height={520} alt="pic" className="rounded-md object-cover max-w-full" src={post?.photo[0] || holderPicture} />
              </a>
              <a className="flex" >
                <Image unoptimized width={520} height={520} alt="pic" className="rounded-md object-cover max-w-full" src={post?.photo[1] || holderPicture} />
              </a>
            </div>
            <div className="flex justify-between gap-[4px]">
              <a className="flex" >
                <Image unoptimized width={520} height={520} alt="pic" className="rounded-md object-cover max-w-full " src={post?.photo[2] || holderPicture} />
              </a>
            </div>
          </button>
        }
        {post?.photo?.length === 4 &&
          <button
            className=" hover:opacity-90 "
            onClick={onClickSlider}
          >
            <div className="flex justify-between gap-[4px] mb-[4px]">
              <a className="flex" >
                <Image unoptimized width={520} height={520} alt="pic" className="rounded-md object-cover max-w-full" src={post?.photo[0] || holderPicture} />
              </a>
              <a className="flex" >
                <Image unoptimized width={520} height={520} alt="pic" className="rounded-md object-cover max-w-full" src={post?.photo[1] || holderPicture} />
              </a>
            </div>
            <div className="flex justify-between gap-[4px]">
              <a className="flex" >
                <Image unoptimized width={520} height={520} alt="pic" className="rounded-md object-cover max-w-full " src={post?.photo[2] || holderPicture} />
              </a>
              <a className="flex" >
                <Image unoptimized width={520} height={520} alt="pic" className="rounded-md object-cover max-w-full " src={post?.photo[3] || holderPicture} />
              </a>
            </div>
          </button>
        }
        {post?.photo?.length >= 5 &&
          <button
            className="hover:opacity-90 "
            onClick={onClickSlider}
          >
            <div className="flex justify-between gap-[4px] mb-[4px]">
              <a className="flex" >
                <Image unoptimized width={520} height={520} alt="pic" className="rounded-md object-cover max-w-full" src={post?.photo[0] || holderPicture} />
              </a>
              <a className="flex" >
                <Image unoptimized width={520} height={520} alt="pic" className="rounded-md object-cover max-w-full" src={post?.photo[1] || holderPicture} />
              </a>
              <a className="flex" >
                <Image unoptimized width={520} height={520} alt="pic" className="rounded-md object-cover max-w-full " src={post?.photo[2] || holderPicture} />
              </a>
            </div>
            <div className="flex justify-between gap-[4px">
              <a className="flex" >
                <Image unoptimized width={520} height={520} alt="pic" className="rounded-md object-cover max-w-full " src={post?.photo[3] || holderPicture} />
              </a>
              <a className="flex relative overflow-hidden rounded-md" >
                {post?.photo?.length > 5 &&
                  <>
                    <div className="text-white text-xl absolute inset-0  bg-slate-700/40 h-[100%] flex justify-center items-center">
                      +{post?.photo?.length - 4}
                    </div>
                  </>}
                <Image unoptimized width={520} height={520} alt="pic" className="rounded-md object-cover max-w-full " src={post?.photo[4] || holderPicture} />
              </a>
            </div>
          </button>
        }
      </div>
      <div id={`${post?.id}`} tabIndex={-1} className="whitespace-pre-wrap leading-normal">
        {modifyConfirm ?
          <form className="flex mt-4 shadow-inner" onSubmit={onSubmit}>
            <div className={modifyConfirm ? "flex flex-col w-full bg-slate-100" : "flex flex-col w-full"}>
              <textarea
                tabIndex={-1}
                className=
                "w-full bg-slate-100 text-xl resize-none outline-none "
                onChange={onChangeDescription}
                value={description}
                rows="8"
              >
              </textarea>
              {descriptionError ? (
                <p className="text-xs mb-[1.5rem] italic text-red-500">팀이야기를 얘기해주세요.</p>
              ) : null}
              <div className='w-full mt-1 flex justify-end'>
                <button
                  type="button"
                  onClick={onClickModifyCancel}
                  className='rounded-lg px-2 py-2 text-gray-600 w-auto focus:outline-blue-800'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <button
                  type="submit"
                  className='rounded-lg ml-2 px-4 py-2 text-white bg-sky-600 hover:bg-sky-700 w-auto focus:outline-blue-800'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </button>
              </div>
            </div>
          </form>
          :
          <p className="mt-4 whitespace-pre-wrap leading-normal"
            dangerouslySetInnerHTML={{ __html: parseLinkTextToHTML(post?.description) }}></p>
        }
        <p className="text-gray-400 text-xs ml-1">
          {post?.modifiedId ? "(수정됨)" : null}
        </p>
      </div>

      <div className="py-4 flex flex-row-reverse items-center justify-between">
        {/* 좋아요 */}
        <div className="inline-flex items-center">
          <div className="flex items-center">
            {!liked ?
              <button className="mr-1" type="button" onClick={onLike}>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-rose-600 fill-slate-50 h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </button>
              :
              <button className="mr-1" type="button" onClick={onUnlike}>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-slate-600 fill-rose-500 h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </button>}
            <span className="text-md text-gray-600 font-bold mr-2">{post?.likes?.length > 0 ? post?.likes?.length : null}</span>
          </div>
          <div className="flex items-center">
            {!commentOpened ?
              <button className="mr-1 flex items-center " type="button" onClick={onToggleComment}>
                <svg xmlns="http://www.w3.org/2000/svg" className="fill-gray-500 h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="text-md text-gray-500 font-bold ml-1">댓글 {post?.numComments || "0"}개</span>
              </button>
              :
              <button className="mr-1 flex items-center " type="button" onClick={onToggleComment}>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-gray-500 h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <span className="text-md text-gray-500 font-bold ml-1">댓글 {post?.numComments || "0"}개</span>
              </button>
            }
          </div>
        </div>
        <div className="text-violet-500 text-base italic">
          {categoryArr[0]}
        </div>
      </div>


      <form onSubmit={onSubmitComment} className="relative">
        <textarea
          className="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 rounded-lg placeholder:text-slate-600 font-medium pr-20"
          type="text" placeholder="Write a comment"
          onChange={onChangeComment}
          value={comment}
        />
        <span className="flex absolute right-2 top-2/4 -mt-5 items-center">
          <button
            type="submit"
            className='rounded-lg px-2 py-2 text-sky-500 w-auto focus:outline-blue-800 hover:text-sky-700'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </span>
      </form>

      {sliderOn ?
        <Slider
          sliderOn={sliderOn}
          photo={post?.photo}
          setSliderOn={setSliderOn}
          sliderClose={sliderClose}
        />
        : null}

      {/* <!-- Comments content --> */}
      {/* <!-- Comment row --> */}
      {commentOpened && commentArr?.length > 0 ?
        <div className="pt-6">
          {commentArr?.map((v) => (
            <div key={v?.docId}>
              <Comments
                post={post}
                comment={v} />
            </div>
          ))}
        </div>
        : null}
      {/* <!-- End More comments --> */}
      {/* <!-- End Comments content --> */}
    </article >
  );
};

PostCard.propTypes = {
  post: PropTypes.object,

}

export default PostCard;