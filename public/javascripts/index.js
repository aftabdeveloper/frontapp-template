$(document).ready(()=>{
    $("#request-login-modal").click(()=>{
        $("#signup-modal").modal('hide')
        $("#login-modal").modal('show')
    })
})

$(document).ready(()=>{
    $("#request-signup-modal").click(()=>{
        $("#login-modal").modal('hide')
        $("#signup-modal").modal('show')
    })
})