import React, {useEffect, useState} from "react";
import AuthService from "../services/auth.service";
import {useNavigate} from "react-router-dom";
const Profile = () => {
    const [profile, setProfile] = useState(undefined);
    const [editable, setEditable] = useState(false);
    const navigate = useNavigate();
    const [nameSurnameInput, setNameSurname] = useState(undefined);
    const [thesisFieldInput, setThesisField] = useState(undefined);
    const [thesisThemeInput, setThesisTheme] = useState(undefined);

    useEffect(() => {
        AuthService.getCurrentUser().then(
            (response) => {
                const user = response.data;
                setProfile(user);
                setNameSurname(user.nameSurname);
                if(user.role==='STUDENT'){
                    setThesisField(user.thesisField);
                    setThesisTheme(user.thesisTheme);
                }
            },
            (error) => {
                console.log("Private page", error);
                if (error.response && error.response.status === 403) {
                    localStorage.clear();
                    window.location.reload();
                    navigate("/login");
                }
            }
        );
    }, []);

    function onSubmit(e){
        e.preventDefault();
        const updatedProf = profile;
        updatedProf.nameSurname = nameSurnameInput;
        if (profile.role==='STUDENT'){
            updatedProf.thesisField = thesisFieldInput;
            updatedProf.thesisTheme = thesisThemeInput;
        }
        console.log(updatedProf);
        AuthService.updateProfile(updatedProf).then(
            (response)=>{
                console.log(response.status);
                window.location.reload();
            },
            (error) => {
                console.log("Private page", error);
                // Invalid token
                // if (error.response && error.response.status === 403) {
                //     AuthService.logout();
                //     navigate("/login");
                //     window.location.reload();
                // }
            }
        )
    }

    function getClassName(){
        return editable?"form-control":"form-control-plaintext";
    }

    return(
        <div className="container bg-white rounded profileContainer" >
            <div className="modal-header"><h3 className="modal-title w-100 text-center">Váš profil</h3></div>
            <form className="pb-2 px-3 pt-3" onSubmit={(e)=>onSubmit(e)}>
                {profile&&(
                    <div>
                        <div className="mb-3 row">
                            <label htmlFor="email" className="col-sm-4 col-form-label"><strong>Email:</strong></label>
                            <div className="col-sm-8">
                                <input type="text"  className="form-control-plaintext" id="email" value={profile.email}/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="nameSurname" className="col-sm-4 col-form-label"><strong>Jméno a příjmení:</strong></label>
                            <div className="col-sm-8">
                                <input type="text" className={getClassName()} id="nameSurname" value={nameSurnameInput}
                                       onChange={(e)=>{ setNameSurname(e.target.value)}}/>
                            </div>
                        </div>
                    </div>)}
                {profile&&profile.role==='STUDENT' && (
                    <div>
                    <div className="mb-3 row">
                        <label htmlFor="thesisField" className="col-sm-4 col-form-label"><strong>Zaměření:</strong></label>
                        <div className="col-sm-8">
                            <input type="text"  className={getClassName()} id="thesisField"
                                   value={thesisFieldInput} onChange={(e)=>{ setThesisField(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="thesisTheme" className="col-sm-4 col-form-label"><strong>Téma práce:</strong></label>
                        <div className="col-sm-8">
                            <input type="text" className={getClassName()} id="thesisTheme" value={thesisThemeInput}
                                   onChange={(e)=>{ setThesisTheme(e.target.value)}}/>
                        </div>
                    </div>
                    </div>
                )}
                <div className="modal-footer">
                    {!editable&&(
                    <button type="button" className="btn btn-secondary" onClick={()=>setEditable(true)} >Upravit profil</button>)}
                    {editable&&(<button type="submit" className="btn btn-primary" >Uložit změny</button>)}
                </div>
            </form>
        </div>
    )
}
export default Profile;