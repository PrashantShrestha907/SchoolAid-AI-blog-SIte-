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
    mutationFn: async (isAdmin) => {  // ← Accept the parameter here
      return await axios.delete(
        `http://localhost:3000/comment/delete/${commentData?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            d1: isAdmin,  // ← Use the parameter here, not undefined IsAdmin
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
      queryClient.invalidateQueries(['comments']);
    },
  });

  const deleteKomment = () => {
    console.log("fired");
    const d1 = user?.IsAdmin;
    console.log("Sending IsAdmin:", d1);  // Check what's being sent
    mutation.mutate(d1);  // This passes d1 to mutationFn as isAdmin parameter
  };
  return (
    <div className="w-full bg-white rounded-3xl my-6">
      <div className="flex gap-3 py-2 px-3 items-center">
        <img src={user?.img || "/Noavatar.jpg"} className="object-cover w-10 h-10 rounded-full" alt="" />
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
      <p className="text-sm px-5 py-3 text-justify">{commentData.desc}</p>
    </div>
  );
};

export default Comments;
