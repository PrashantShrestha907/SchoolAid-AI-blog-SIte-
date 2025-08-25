import { IKImage } from "imagekitio-react";
import { formatDistance } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const Comments = ({ commentData, commentId }) => {
  const rawDate = formatDistance(new Date(commentData?.createdAt), new Date(), {
    addSuffix: true,
    includeSeconds: true,
  });
  const formattedDate = rawDate.replace(/^about\s/, "");
  const { user } = useContext(AuthContext);
  const { token } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axios.delete(
        `http://localhost:3000/comment/delete/${commentData?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      console.log("deleted");
      toast("comment deleted successfully", {
        progressClassName: "my-progress-bar-red",
        theme: "light",
      });
      // setTimeout(() => {
      //   window.location.reload();
      // }, 4500);
      queryClient.invalidateQueries(['comments']);
    },
  });

  const deleteKomment = () => {
    console.log("fired");
    mutation.mutate();
  };

  return (
    <div className="w-full bg-white rounded-3xl my-6">
      <div className="flex gap-3 py-4 px-3 items-center">
        <IKImage
          urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
          // {...(commentData?.user?.img ? { src: commentData?.user?.img} : { path: "/userImg.jpeg" })}
          path={commentData?.user?.img}
          loading="lazy"
          lqip={{ active: true, quality: 20 }}
          className="object-cover w-10 h-10 rounded-full"
        />
        <p className="text-sm font-medium">{commentData?.user?.username}</p>
        <p className="text-[#B5B5B5] text-sm"> {formattedDate}</p>
        {commentData.user._id === user._id || user.IsAdmin ? (
          <>
            <div className="cursor-pointer" onClick={() => deleteKomment()}>
              <DeleteIcon className="text-red-500" />
            </div>
            <p className="text-red-500">Delete this comment</p>
          </>
        ) : null}
      </div>
      <p className="text-sm px-5 py-5 text-justify">{commentData.desc}</p>
    </div>
  );
};

export default Comments;
