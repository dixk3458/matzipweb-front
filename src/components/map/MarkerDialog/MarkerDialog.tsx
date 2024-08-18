import { MouseEvent } from 'react';
import useGetPostByPostId from '../../../hooks/queries/useGetPostByPostId';
import { formatDate } from '../../../utils';
import XIcon from '../../icon/XIcon';
import styles from './MarkerDialog.module.css';
import { useNavigate } from 'react-router-dom';

interface MarkerDialogProps {
  postId: number;
  onClickCloseButton: (e: MouseEvent) => void;
}

function MarkerDialog({ postId, onClickCloseButton }: MarkerDialogProps) {
  const { data: post } = useGetPostByPostId(postId);
  const navigation = useNavigate();

  return (
    <div className={styles.dialogContainer}>
      <p
        className={styles.title}
        onClick={() => {
          navigation(`/feed/${post?.id}`, { state: { feedId: post?.id } });
        }}
      >
        {post?.title}
      </p>
      <div className={styles.innerContainer}>
        <div className={styles.dateAndAddressContainer}>
          <div className={styles.authorAndDate}>
            <p className={styles.date}>
              {formatDate(post?.createdDate ?? new Date(), '.')}
            </p>
            <p className={styles.author}>
              By {post?.author.nickname ?? post?.author.email}
            </p>
          </div>
          <p className={styles.address}>{post?.address}</p>
        </div>
        <div className={styles.imageContainer}>
          {post && post.images.length > 0 ? (
            <img
              src={post.images[0].uri}
              alt={post.title}
              className={styles.image}
            />
          ) : (
            <span className={styles.noImage}>No Image Available</span>
          )}
        </div>
      </div>

      <button
        onClick={e => onClickCloseButton(e)}
        className={styles.closeButton}
      >
        <XIcon />
      </button>
    </div>
  );
}

export default MarkerDialog;
